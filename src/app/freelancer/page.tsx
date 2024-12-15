import Link from "next/link";

export default function UserPage() {
  return (
    <div>
      <h1>User Page</h1>
      <p>
        Please <Link href="/auth/freelancer/login">click here</Link> to log in.
      </p>
    </div>
  );
}
