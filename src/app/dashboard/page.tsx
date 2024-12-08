"use client";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

export default function dashboard() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.clear();
    router.push("/"); // Redirect to login page after logout
  };
  return (
    <div>
      <button className={styles.buttons} onClick={handleLogout} />
    </div>
  );
}
