import * as express from 'express';
import * as device from 'express-device';
import { RaidController } from "./controllers/raidController";

const app = express();
const PORT = process.env.PORT || 3000;

function defineControllers() {
	RaidController(app);
}

app.use(device.capture());
device.enableViewRouting(app);

app.listen(PORT, () => {
	device.enableDeviceHelpers(app);
	app.set('view engine', 'ejs');
	app.set('views', 'src/views');
	app.use('/static', express.static('src/client'));

	defineControllers();
	console.log(`Server is running in http://localhost:${PORT}`)
})