var { execFile } = require("child_process")
execFile("./test.exe", function (err, stdout, stderr) {
  if (err) {
    console.error(err);
  }
  console.log("stdout:", stdout)
  console.log("stderr:", stderr);
})