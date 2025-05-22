import { useField } from "../context/FieldContext";
import { FiShare2 } from "react-icons/fi";
import { GiSoccerField } from "react-icons/gi";
import html2canvas from "html2canvas";

export default function ShareButton() {
  const { slots } = useField();
  const isDisabled = slots.some(slot => slot === null);

  const handleShare = async (e) => {
    const fieldElement = document.querySelector(".field");
    if (!fieldElement) return;

    // Preguntar el nombre antes de hacer nada
    const promptName = prompt("¿Nombre del archivo?", "formacion");
    if (promptName === null) return; // Si cancela, no hace nada
    const fileName = promptName.endsWith(".png") ? promptName : promptName + ".png";

    const canvas = await html2canvas(fieldElement);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));
    const file = new File([blob], fileName, { type: "image/png" });

    // Web Share API (móvil y navegadores compatibles)
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: "My Hero DT Academia",
          text: "¡Mirá mi equipo!",
          files: [file],
        });
        return;
      } catch (err) {
        // Si cancela el share, sigue con la descarga abajo si querés, o simplemente return;
        return;
      }
    }

    // Si no, descarga normal con ese nombre
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);
    if (e?.currentTarget) e.currentTarget.blur();
  };

  return (
    <button
      onClick={handleShare}
      className="share-button"
      disabled={isDisabled}
    >
      <GiSoccerField className="icon-field" />
      Compartir <FiShare2 className="icon-share" />
    </button>
  );
}
