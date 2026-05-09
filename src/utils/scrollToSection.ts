export default function scrollToSection(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth" });
}
