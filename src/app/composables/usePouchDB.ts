import PouchDB from 'pouchdb'
import PouchdbFind from 'pouchdb-find'

PouchDB.plugin(PouchdbFind)

export function usePouchDB() {
  const { httpPost } = useHttp()
  const config = useRuntimeConfig()

  function pouchdbLocal(dbName: string) {
    return new PouchDB(dbName, { auto_compaction: true })
  }

  async function pouchdbRemote(dbName: string): Promise<PouchDB.Database | null> {
    try {
      const resp = await httpPost('auth/couchdb/generate', {}, 'user')
      if (resp?.data) {
        const couchDBUrl = config.public.couchDBUrl as string
        return new PouchDB(couchDBUrl + dbName, {
          fetch: (url: any, opts: any) => {
            opts.headers.set('X-Auth-CouchDB-UserName', resp.data.username)
            opts.headers.set('X-Auth-CouchDB-Token', resp.data.token)
            return PouchDB.fetch(url, opts)
          },
        } as any)
      }
    } catch (err) {
      console.error('pouchdbRemote error:', err)
    }
    return null
  }

  async function initPouch(dbName: string) {
    try {
      const resp = await httpPost('auth/couchdb/generate', {}, 'user')
      if (resp?.data) {
        const couchDBUrl = config.public.couchDBUrl as string
        const remoteDB = new PouchDB(couchDBUrl + dbName, {
          fetch: (url: any, opts: any) => {
            opts.headers.set('X-Auth-CouchDB-UserName', resp.data.username)
            opts.headers.set('X-Auth-CouchDB-Token', resp.data.token)
            return PouchDB.fetch(url, opts)
          },
        } as any)
        const localDB = new PouchDB(dbName, { auto_compaction: true })
        await localDB.replicate.from(remoteDB).on('error', (err: any) => {
          console.error('PouchDB replicate error:', err)
        })
      }
    } catch (err) {
      console.error('initPouch error:', err)
    }
  }

  return {
    pouchdbLocal,
    pouchdbRemote,
    initPouch,
  }
}
