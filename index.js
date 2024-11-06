let express = require("express");
let app = new express();

// Set up database connection
const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "coolthings-db.cvyykm4m8pnf.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "password",
    database: "coolthings",
    port: 3306,
  },
});

// Render things dynamically within a single HTML page
app.get("/", (req, res) => {
  knex
    .select()
    .from("thing")
    .then((result) => {
      let html = `
        <html>
        <head>
          <title>Cool Things</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 80%;
              margin: auto;
              padding-top: 50px;
            }
            h1 {
              text-align: center;
              font-size: 2.5rem;
              color: #333;
            }
            .grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr); /* 4 items per row */
              gap: 20px;
              margin-top: 30px;
            }
            .card {
              background-color: white;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              text-align: center;
            }
            .card img {
              width: 100%;
              height: auto;
              border-radius: 10px;
            }
            .card h2 {
              font-size: 1.5rem;
              margin-top: 10px;
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Cool Things Collection</h1>
            <div class="grid">
      `;

      result.forEach((thing) => {
        html += `
          <div class="card">
            <img src="${thing.img}" alt="${thing.nameofthing}">
            <h2>${thing.nameofthing}</h2>
          </div>
        `;
      });

      html += `
            </div>
          </div>
        </body>
        </html>
      `;

      res.send(html);
    });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

