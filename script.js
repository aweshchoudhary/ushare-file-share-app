const File = require("./models/file");
const fs = require("fs");
const connect = require("./config/db");

async function deleteData() {
  const pastData = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastData } });
  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`sucessfully deleted file ${file.filename}`);
      } catch (err) {
        console.log(err);
      }
    }
    console.log("Job Done");
  }
}

deleteData().then(process.exit);
