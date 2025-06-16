<!DOCTYPE html>
<html lang="si">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>PROJECT | NIMA NEW WHATSAPP CATALOG</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap" rel="stylesheet" />
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      text-align: center;
      background: url('https://files.catbox.moe/uzjibd.jpg') no-repeat center center fixed;
      background-size: cover;
      color: #ffffff;
    }

    header {
      background-color: rgba(0, 0, 0, 0.7);
      padding: 20px 0;
      font-size: 24px;
      font-weight: bold;
      border-bottom: 1px solid #333;
    }

    .powered {
      font-size: 14px;
      color: #aaa;
      margin-top: 5px;
      letter-spacing: 1px;
    }

    .container {
      padding: 80px 20px 40px;
      background-color: rgba(0, 0, 0, 0.5);
    }

    input[type="file"], button {
      margin: 10px;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
    }

    input[type="file"] {
      background: #333;
      color: #fff;
    }

    button {
      background-color: #25D366;
      color: white;
      font-weight: 600;
      letter-spacing: 1px;
    }

    button:hover {
      background-color: #1ebe5d;
    }

    .preview {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 15px;
      margin-top: 30px;
    }

    canvas {
      border: 2px solid #444;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      width: 250px;
      height: auto;
    }

    .piece {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    audio {
      position: fixed;
      bottom: 10px;
      left: 10px;
    }
  </style>
</head>
<body>

  <header>
    PROJECT | NIMA NEW WHATSAPP CATALOG<br>
    <span class="powered">POWERED BY LOKU NIMAH</span>
  </header>

  <div class="container">
    <input type="file" id="imageInput" accept="image/*">
    <button onclick="splitImage()">NEXT</button>
    <button onclick="downloadAll()" style="background:#0e7aef;">Download All</button>
    <div id="output" class="preview"></div>
  </div>

  <!-- Background Music -->
  <audio autoplay loop controls>
    <source src="https://files.catbox.moe/0za354.mp3" type="audio/mp3">
    ඔබේ browser එකට audio play කරන්න support නෑ.
  </audio>

  <script>
    let canvasList = [];

    function splitImage() {
      const input = document.getElementById('imageInput');
      const file = input.files[0];
      if (!file) return alert("කරුණාකර පොටෝ එකක් තෝරන්න");

      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          const pw = img.width / 3;
          const ph = img.height / 2;
          const out = document.getElementById('output');
          out.innerHTML = '';
          canvasList = [];
          let cnt = 0;

          for (let r = 0; r < 2; r++) {
            for (let c = 0; c < 3; c++) {
              const canvas = document.createElement('canvas');
              canvas.width = pw;
              canvas.height = ph;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, c * pw, r * ph, pw, ph, 0, 0, pw, ph);

              // Overlay number
              ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
              ctx.fillRect(10, 10, 40, 40);
              ctx.fillStyle = '#fff';
              ctx.font = 'bold 24px Poppins, sans-serif';
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(++cnt, 30, 30);

              const pieceDiv = document.createElement('div');
              pieceDiv.className = 'piece';

              const dlButton = document.createElement('button');
              dlButton.textContent = 'Download';
              dlButton.onclick = () => {
                const link = document.createElement('a');
                link.download = `piece_${cnt}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
              };

              pieceDiv.appendChild(canvas);
              pieceDiv.appendChild(dlButton);
              out.appendChild(pieceDiv);

              canvasList.push({ canvas, index: cnt });
            }
          }
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }

    function downloadAll() {
      if (canvasList.length === 0) return alert("මීට පළමුව image එකක් split කරන්න");
      canvasList.sort((a, b) => a.index - b.index);

      canvasList.forEach((item, i) => {
        setTimeout(() => {
          const link = document.createElement('a');
          link.download = `piece_${item.index}.png`;
          link.href = item.canvas.toDataURL('image/png');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }, i * 600); // delay between each download
      });
    }
  </script>

</body>
  </html>
