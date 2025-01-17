export function showFile(domain) {
        let fileType = blstFile.type;
        let validExtensions = ["application/json"];
        if (validExtensions.includes(fileType)) {
          if (blstFile.size > 4194304) { // 4mb
            alert("File size too big");
            dropArea.classList.remove("active");
            dragText.textContent = "+ Drag & Drop";
          } else {
            let reader = new FileReader();
            reader.onload = (event) => {
              let oas = JSON.parse(event.target.result);
              fetch("https://idk.blstsecurity.com/create_scan", {
                method: "POST",
                body: JSON.stringify({
                  oas
                }),
              }).then((response) => response.json()).then((data) => {
            let tmp = dropArea.innerHTML;
             const a = document.createElement("a");
                        a.href = `https://www.blstsecurity.com/ScanSwagger/${data.scan_id}?tab=Overview&promo=apibrief#${domain}`;
                        a.target = "_blank";
                        a.rel = "noopener noreferrer";
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        // window.location=window.location;
              });
              let successHtml = `
              <div style="display:Flex;justify-content:center;">
<div class="" style="width:20px;margin-right:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" stroke="green" class="animated rotation" />
</svg></div>
            <span>${blstFile.name}</span></div>`;
              dropArea.innerHTML = successHtml;
            };
            reader.readAsText(blstFile);
          }
        } else {
          alert("Not an acceptable file!");
          dropArea.classList.remove("active");
          dragText.textContent = "+ Drag & Drop";
        }
      }
