/* eslint-disable */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const webtorrent = require('webtorrent');
const app = express();
const sound = require(`${__dirname}/assets/sounds/wcronomarle.js`);


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

var client = new webtorrent();

var getLargestFile = function(torrent) {
    var file;
    for (i = 0; i < torrent.files.length; i++) {
        if (!file || file.length < torrent.files[i].length) {
            file = torrent.files[i];
        }
    }
    return file;
};

var buildMagnetURI = function(infoHash) {
    return 'magnet:?xt=urn:btih:' + infoHash + '&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';
};

app.get('/api/add/:infoHash', function(req, res) {
    if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
        res.status(500).send('Missing infoHash parameter!');
        return;
    }
    var torrent = buildMagnetURI(req.params.infoHash);
    try {
        client.add(torrent, function(torrent) {
            var file = getLargestFile(torrent);
            /*torrent.swarm.on('upload', function() {
                if (torrent.length == torrent.downloaded) {
                    torrent.swarm.destroy();
                    torrent.discovery.stop();
                }
            });*/
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end();
        });
    } catch (err) {
        res.status(500).send('Error: ' + err.toString());
    }
});


app.get('/stream/:infoHash.mp4', function(req, res, next) {
    if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
        res.status(500).send('Missing infoHash parameter!');
        return;
    }
    var torrent = buildMagnetURI(req.params.infoHash);
    try {
        var torrent = client.get(torrent);
        var file = getLargestFile(torrent);
        var total = file.length;

        if (typeof req.headers.range != 'undefined') {
            var range = req.headers.range;
            var parts = range.replace(/bytes=/, "").split("-");
            var partialstart = parts[0];
            var partialend = parts[1];
            var start = parseInt(partialstart, 10);
            var end = partialend ? parseInt(partialend, 10) : total - 1;
            var chunksize = (end - start) + 1;
        } else {
            var start = 0;
            var end = total;
        }

        var stream = file.createReadStream({ start: start, end: end });
        res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
        stream.pipe(res);
    } catch (err) {
        res.status(500).send('Error: ' + err.toString());
    }
});


app.get('/api/delete/:infoHash', function(req, res, next) {
	if (typeof req.params.infoHash == 'undefined' || req.params.infoHash == '') {
		res.status(500).send('Missing infoHash parameter!');
		return;
	}
	var torrent = buildMagnetURI(req.params.infoHash);
	try {
		var torrent = client.remove(torrent);
		res.status(200).send('Removed torrent. ');
	} catch (err) {
		res.status(500).send('Error: ' + err.toString());
	}
});

app.get('/getMidi', function(req, res, next) {
	res.status(200).send(sound.cronoMarle);
});

app.listen(process.env.PORT || 8081);
