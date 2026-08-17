import { logout } from '@/app/admin/actions'
import { ProjectGallery } from '@/app/admin/ProjectGallery'
import { caseProjects } from '@/content/projects'
import { getGalleryPhotos } from '@/lib/admin/gallery-store'
import styles from './admin.module.css'

export const metadata = { robots: { index: false, follow: false } }
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const withPhotos = await Promise.all(
    caseProjects.map(async (project) => ({
      project,
      photos: await getGalleryPhotos(project.slug),
    })),
  )

  const redisConfigured = Boolean(
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL,
  )
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  const rebuildConfigured = Boolean(process.env.VERCEL_DEPLOY_HOOK_URL)

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className="t-meta">Photo admin</p>
        <form action={logout}>
          <button className={styles.logoutButton} type="submit">
            Log out
          </button>
        </form>
      </header>

      {(!redisConfigured || !blobConfigured || !rebuildConfigured) && (
        <div className={styles.warning}>
          <p className="t-meta">Настройка не завершена</p>
          <ul>
            {!blobConfigured && <li>Vercel Blob не подключён — загрузка не сработает.</li>}
            {!redisConfigured && <li>Redis не подключён — список фото не сохранится.</li>}
            {!rebuildConfigured && (
              <li>Deploy Hook не задан — фото сохранится, но сайт не пересоберётся сам.</li>
            )}
          </ul>
          <p>См. README → «Админка фото».</p>
        </div>
      )}

      <div className={styles.projects}>
        {withPhotos.map(({ project, photos }) => (
          <ProjectGallery key={project.slug} project={project} initialPhotos={photos} />
        ))}
      </div>
    </main>
  )
}
