function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

function initCopyButtons() {
  const copyButtons = document.querySelectorAll(".js-copy-button");
  for (let btn of copyButtons) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetButton = e.target;
      const defaultText = targetButton.textContent;
      const valueToCopy = targetButton.dataset.value;
      const copedText = targetButton.dataset.copiedText ?? "";
      try {
        copyTextToClipboard(valueToCopy);

        targetButton.textContent = copedText.length === 0 ?
          "Скопировано" : copedText;

        setTimeout(() => {
          targetButton.textContent = defaultText;
        }, 2000);
      } catch (e) {
        console.log(e, "error");
        targetButton.textContent = "Failed to copy";
      }
    });
  }
}

initCopyButtons();
