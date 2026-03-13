import { Guide } from "@/types";

export default function GuideCard({ guide }: { guide: Guide }) {
  return <div>{guide.title}</div>;
}
