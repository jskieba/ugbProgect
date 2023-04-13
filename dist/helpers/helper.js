"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUserProfile = exports.isJSON = exports.dateZoneString = exports.dateIsAfter = exports.dateIsBefore = exports.timestampToDate = exports.dateCustomToTimestamp = exports.dateCustom = exports.dateToTimestamp = exports.dateNowTimestamp = exports.dateNowFormat = exports.calculateDifDate = exports.countingHoursWorked = void 0;
const moment_1 = __importDefault(require("moment"));
const countingHoursWorked = (dateStart, dateFinish) => moment_1.default.duration((0, moment_1.default)((0, exports.timestampToDate)(dateStart, '')).diff((0, exports.timestampToDate)(dateFinish, ''))).asHours();
exports.countingHoursWorked = countingHoursWorked;
const calculateDifDate = (dateStart, dateFinish, type) => { let hour = moment_1.default.duration((0, moment_1.default)((0, exports.timestampToDate)(dateStart, '')).diff((0, exports.timestampToDate)(dateFinish, ''))); switch (type) {
    case 'days': return hour.asDays();
    case 'hour': return hour.asHours();
    case 'minutes': return hour.asMinutes();
    case 'seconds': return hour.asSeconds();
    default: return hour;
} };
exports.calculateDifDate = calculateDifDate;
const dateNowFormat = (format) => (0, moment_1.default)().format(format);
exports.dateNowFormat = dateNowFormat;
const dateNowTimestamp = () => (0, moment_1.default)().unix();
exports.dateNowTimestamp = dateNowTimestamp;
const dateToTimestamp = (date) => (0, moment_1.default)(date).unix();
exports.dateToTimestamp = dateToTimestamp;
const dateCustom = (date, format) => (0, moment_1.default)(date).format(format);
exports.dateCustom = dateCustom;
const dateCustomToTimestamp = (date, format) => (0, moment_1.default)(date, format).unix();
exports.dateCustomToTimestamp = dateCustomToTimestamp;
const timestampToDate = (date, format) => (0, moment_1.default)(new Date(date * 1000)).format(format);
exports.timestampToDate = timestampToDate;
const dateIsBefore = (date, dateToCompare, format) => (0, moment_1.default)(date, format).subtract(1, 'seconds').isBefore((0, moment_1.default)(dateToCompare, format));
exports.dateIsBefore = dateIsBefore;
const dateIsAfter = (date, dateToCompare, format) => (0, moment_1.default)(date, format).add(1, 'seconds').isAfter((0, moment_1.default)(dateToCompare, format));
exports.dateIsAfter = dateIsAfter;
const dateZoneString = (date, format, timeZone) => new Date(date * 1000).toLocaleString(format, { timeZone });
exports.dateZoneString = dateZoneString;
const isJSON = (str) => { try {
    JSON.parse(str);
}
catch (e) {
    return false;
} return true; };
exports.isJSON = isJSON;
const cleanUserProfile = (user) => {
    user.FUNCIONARIO && user.position == "FUNCIONARIO" ? null : delete user.FUNCIONARIO;
    user.JEFE && user.JEFE.length > 0 && user.position == "JEFE" ? null : delete user.JEFE;
    user.GERENTE && user.GERENTE.length > 0 && user.position == "GERENTE" ? null : delete user.GERENTE;
    user.DIRECTOR && user.DIRECTOR.length > 0 && user.position == "DIRECTOR" ? null : delete user.DIRECTOR;
    return user;
};
exports.cleanUserProfile = cleanUserProfile;
