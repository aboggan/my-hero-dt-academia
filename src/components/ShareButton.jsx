'use client'
import html2canvas from "html2canvas";
import { FiShare2 } from "react-icons/fi";
import { GiSoccerField } from "react-icons/gi";

export default function ShareButton() {
  const handleShare = async (e) => {
    const fieldElement = document.querySelector(".field");
    if (!fieldElement) return;

    const canvas = await html2canvas(fieldElement);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], "formacion.png", { type: "image/png" });

    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "My Hero DT Academia",
          text: "¡Mirá mi equipo!",
          files: [file],
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "formacion.png";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Error al compartir:", err);
    } finally {
      if (e?.currentTarget) e.currentTarget.blur(); // Remueve el active/focus
    }
  };

  return (
    <button onClick={handleShare} className="share-button">
      <GiSoccerField className="icon-field" />
      Compartir <FiShare2 className="icon-share" />
    </button>
  );
}
