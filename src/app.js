"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureApp = void 0;
const express = require("express");
const R = require("ramda");
const cors = require("cors");
const body_parser_1 = require("body-parser");
const middleware_1 = require("aws-serverless-express/middleware");
const path_1 = require("path");
const badges_1 = require("./badges");
const adminActions_1 = require("./adminActions");
const discourseMessage_1 = require("./utils/discourseMessage");
function configureApp() {
    const app = express();
    app.enable("trust proxy");
    app.set("trust proxy", true);
    app.set("view engine", "jade");
    app.use(express.static(path_1.join(__dirname, "public")));
    app.use(cors());
    app.use(body_parser_1.json());
    app.use(body_parser_1.urlencoded({ extended: true }));
    app.use(middleware_1.eventContext());
    app.get("/", (req, res) => {
        res.json({ api: "MakerDAO - Badges API" });
    });
    app.get("/address/:address", async (req, res) => {
        badges_1.getBadgesForAddress(req.params.address)
            .then(badgeList => { res.json({ badges: badgeList }); })
            .catch(e => { console.log(e); });
    });
    app.get("/update-roots", async (req, res) => {
        adminActions_1.updateRoots();
        res.json({ success: true });
    });
    app.get("/discourse", (req, res) => {
        const validParams = ["username", "address", "signature"];
        const matchesQueryParams = k => { return R.contains(k, R.keys(req.query)); };
        if (!validParams.every(key => matchesQueryParams(key)))
            return res.json({ errors: ["Invalid request query, please check request params."] });
        discourseMessage_1.default(req.query)
            .then(response => {
            console.log("response:", response);
            res.status(200).json(response);
        })
            .catch(error => {
            console.log("error:", error);
            res.status(500).json(error);
        });
        return;
    });
    return app;
}
exports.configureApp = configureApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQywyQkFBMkI7QUFDM0IsNkJBQTZCO0FBQzdCLDZDQUErQztBQUMvQyxrRUFBaUU7QUFDakUsK0JBQTRCO0FBQzVCLHFDQUErQztBQUMvQyxpREFBNkM7QUFFN0MsK0RBQXdEO0FBRXhELFNBQWdCLFlBQVk7SUFDMUIsTUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFDdEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMxQixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUUvQixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQUksRUFBRSxDQUFDLENBQUM7SUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3QkFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QyxHQUFHLENBQUMsR0FBRyxDQUFDLHlCQUFZLEVBQUUsQ0FBQyxDQUFDO0lBRXhCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzlDLDRCQUFtQixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2RCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckMsQ0FBQyxDQUFDLENBQUM7SUFFSCxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzFDLDBCQUFXLEVBQUUsQ0FBQztRQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM5QixDQUFDLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQ2pDLE1BQU0sV0FBVyxHQUFHLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN6RCxNQUFNLGtCQUFrQixHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDcEQsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMscURBQXFELENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdkYsMEJBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQzthQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNuQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNqQyxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FBQztRQUVMLE9BQU87SUFDVCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQWhERCxvQ0FnREMifQ==