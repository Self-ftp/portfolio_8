import { login } from '@/app/admin/actions'
import styles from './login.module.css'

export const metadata = { robots: { index: false, follow: false } }

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <main className={styles.page}>
      <form className={styles.form} action={login}>
        <p className="t-meta">Admin</p>
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
        />
        {error && <p className={styles.error}>Неверный пароль.</p>}
        <button className={styles.button} type="submit">
          Enter
        </button>
      </form>
    </main>
  )
}
