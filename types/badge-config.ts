export interface BadgeConfig {
  eventName: string

  // Profile image URL (opsional — jika tidak ada, akan tampil inisial)
  profileImage?: string

  // Fallback initials (dipakai jika profileImage tidak ada)
  firstName: string
  lastName: string

  // company — tampil kecil di bawah badge (opsional)
  company: string

  // role — dipakai sebagai NAMA LENGKAP di bagian bawah badge
  role: string

  // badgeId — dipakai sebagai JOB TITLE di bagian bawah badge
  badgeId: string

  // Warna badge
  badgeColor: string
  badgeBottomColor: string
}

export const defaultBadgeConfig: BadgeConfig = {
  eventName: "PORTFOLIO",
  profileImage: undefined,
  firstName: "Syafar",
  lastName: "uddin",
  company: "@syafar.dev",
  role: "Syafaruddin",
  badgeId: "Job Title",
  badgeColor: "#e6c88a",
  badgeBottomColor: "#1a1a2e",
}