// components/ShareButton.jsx
'use client'
import html2canvas from "html2canvas";

export default function ShareButton() {
  const handleShare = async () => {
    const fieldElement = document.querySelector(".field");
    if (!fieldElement) return;

    const canvas = await html2canvas(fieldElement);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], "formacion.png", { type: "image/png" });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "My Hero DT Academia",
          text: "¡Mirá mi equipo!",
          files: [file],
        });
      } catch (err) {
        console.error("Error al compartir:", err);
      }
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "formacion.png";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button onClick={handleShare} className="px-4 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition">
      Compartir
    </button>
  );
}
