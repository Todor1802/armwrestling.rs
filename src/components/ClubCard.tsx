import { Club } from "@/types";

export default function ClubCard({ club }: { club: Club }) {
  return <div>{club.name}</div>;
}
