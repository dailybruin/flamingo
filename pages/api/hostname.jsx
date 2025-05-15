var os = require("os");
var hostname = os.hostname();

export default function handler(req, res) {
    res.status(200).json({ "hostname": hostname })
}