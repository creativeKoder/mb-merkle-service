"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = exports.addOrUpdateTemplateRecord = void 0;
const { v4: uuidv4 } = require("uuid");
var AWS = require("aws-sdk");
// if (process.env.ENVIRONMENT === "local") {
//   var credentials = new AWS.SharedIniFileCredentials({ profile: "stwoh2" });
//   AWS.config.credentials = credentials;
// }
AWS.config.update({ region: "us-east-1" });
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const DYNAMODB_TABLE = process.env.DYNAMODB_TABLE;
async function addOrUpdateTemplateRecord(_templateId, _addresses, _root, _progress) {
    const timestamp = new Date().getTime();
    const tId = await getIdByTemplate(_templateId);
    // console.log(tId);
    // console.log(addresses);
    if (tId) {
        const params = {
            TableName: DYNAMODB_TABLE,
            Key: { id: tId },
            UpdateExpression: "set addresses = :v, root = :w, progress = :x, updatedAt = :y",
            ExpressionAttributeValues: {
                ":v": JSON.stringify(_addresses != [] ? _addresses.sort() : []),
                ":w": _root,
                ":x": JSON.stringify(_progress),
                ":y": timestamp,
            },
        };
        // console.log(params);
        dynamoDb.update(params, (error, result) => {
            if (error) {
                console.log(error);
            }
            // console.log(result);
            return result;
        });
    }
    else if (tId === null) {
        const params = {
            TableName: DYNAMODB_TABLE,
            Item: {
                id: uuidv4(),
                templateId: _templateId,
                addresses: JSON.stringify(_addresses),
                root: _root,
                progress: JSON.stringify(_root),
                createdAt: timestamp,
                updatedAt: timestamp,
            },
        };
        // console.log(params);
        dynamoDb.put(params, (error, result) => {
            if (error) {
                console.log(error);
            }
            return result;
        });
    }
}
exports.addOrUpdateTemplateRecord = addOrUpdateTemplateRecord;
function getIdByTemplate(templateId) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: DYNAMODB_TABLE,
            IndexName: "templateId-index",
            KeyConditionExpression: "templateId = :templateId",
            ExpressionAttributeValues: {
                ":templateId": templateId,
            },
        };
        // console.log(params);
        dynamoDb.query(params, (error, result) => {
            if (error) {
                console.log(error);
                reject();
            }
            if (result.Items.length > 0) {
                // console.log("returned: " + result.Items[0]["id"]);
                resolve(result.Items[0]["id"]);
            }
            else {
                resolve(null);
            }
        });
    });
}
function getTemplate(templateId) {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: DYNAMODB_TABLE,
            IndexName: "templateId-index",
            KeyConditionExpression: "templateId = :templateId",
            ExpressionAttributeValues: {
                ":templateId": templateId,
            },
        };
        dynamoDb.query(params, (error, result) => {
            if (error) {
                console.log(error);
                reject();
            }
            if (result.Items.length > 0) {
                const addresses = result.Items[0]["addresses"];
                resolve({
                    addresses: [...JSON.parse(addresses)],
                    root: result.Items[0]["root"],
                    progress: result.Items[0]["progress"],
                });
            }
            else {
                resolve({
                    addresses: [],
                    root: "",
                    progress: {},
                });
            }
        });
    });
}
exports.getTemplate = getTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBRXZDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUU3Qiw2Q0FBNkM7QUFDN0MsK0VBQStFO0FBQy9FLDBDQUEwQztBQUMxQyxJQUFJO0FBQ0osR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUUzQyxNQUFNLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7QUFFbkQsTUFBTSxjQUFjLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFlLENBQUM7QUFFcEQsS0FBSyxVQUFVLHlCQUF5QixDQUM3QyxXQUFtQixFQUNuQixVQUFvQixFQUNwQixLQUFhLEVBQ2IsU0FBaUI7SUFFakIsTUFBTSxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN2QyxNQUFNLEdBQUcsR0FBRyxNQUFNLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvQyxvQkFBb0I7SUFDcEIsMEJBQTBCO0lBQzFCLElBQUksR0FBRyxFQUFFO1FBQ1AsTUFBTSxNQUFNLEdBQUc7WUFDYixTQUFTLEVBQUUsY0FBYztZQUN6QixHQUFHLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFO1lBQ2hCLGdCQUFnQixFQUNkLDhEQUE4RDtZQUNoRSx5QkFBeUIsRUFBRTtnQkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQy9ELElBQUksRUFBRSxLQUFLO2dCQUNYLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztnQkFDL0IsSUFBSSxFQUFFLFNBQVM7YUFDaEI7U0FDRixDQUFDO1FBQ0YsdUJBQXVCO1FBQ3ZCLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBVSxFQUFFLE1BQVcsRUFBRSxFQUFFO1lBQ2xELElBQUksS0FBSyxFQUFFO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDcEI7WUFDRCx1QkFBdUI7WUFDdkIsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7S0FDSjtTQUFNLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtRQUN2QixNQUFNLE1BQU0sR0FBRztZQUNiLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLElBQUksRUFBRTtnQkFDSixFQUFFLEVBQUUsTUFBTSxFQUFFO2dCQUNaLFVBQVUsRUFBRSxXQUFXO2dCQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3JDLElBQUksRUFBRSxLQUFLO2dCQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztnQkFDL0IsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFNBQVMsRUFBRSxTQUFTO2FBQ3JCO1NBQ0YsQ0FBQztRQUNGLHVCQUF1QjtRQUN2QixRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQVUsRUFBRSxNQUFXLEVBQUUsRUFBRTtZQUMvQyxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3BCO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUM7QUFwREQsOERBb0RDO0FBRUQsU0FBUyxlQUFlLENBQUMsVUFBa0I7SUFDekMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLE1BQU0sR0FBRztZQUNiLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFNBQVMsRUFBRSxrQkFBa0I7WUFDN0Isc0JBQXNCLEVBQUUsMEJBQTBCO1lBQ2xELHlCQUF5QixFQUFFO2dCQUN6QixhQUFhLEVBQUUsVUFBVTthQUMxQjtTQUNGLENBQUM7UUFDRix1QkFBdUI7UUFDdkIsUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxLQUFVLEVBQUUsTUFBVyxFQUFFLEVBQUU7WUFDakQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxFQUFFLENBQUM7YUFDVjtZQUNELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUMzQixxREFBcUQ7Z0JBQ3JELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVELFNBQWdCLFdBQVcsQ0FDekIsVUFBa0I7SUFFbEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUNyQyxNQUFNLE1BQU0sR0FBRztZQUNiLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLFNBQVMsRUFBRSxrQkFBa0I7WUFDN0Isc0JBQXNCLEVBQUUsMEJBQTBCO1lBQ2xELHlCQUF5QixFQUFFO2dCQUN6QixhQUFhLEVBQUUsVUFBVTthQUMxQjtTQUNGLENBQUM7UUFDRixRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQVUsRUFBRSxNQUFXLEVBQUUsRUFBRTtZQUNqRCxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuQixNQUFNLEVBQUUsQ0FBQzthQUNWO1lBQ0QsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQztvQkFDTixTQUFTLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBQ3JDLElBQUksRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztvQkFDN0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO2lCQUN0QyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxPQUFPLENBQUM7b0JBQ04sU0FBUyxFQUFFLEVBQUU7b0JBQ2IsSUFBSSxFQUFFLEVBQUU7b0JBQ1IsUUFBUSxFQUFFLEVBQUU7aUJBQ2IsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWpDRCxrQ0FpQ0MifQ==