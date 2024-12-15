
import { redirect } from "next/navigation";

export default function UserPage() {
  redirect("/auth/freelancer/login"); // Redirect to user login page
}
