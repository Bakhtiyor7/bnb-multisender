"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataItem = void 0;
const typeorm_1 = require("typeorm");
const Upload_1 = require("./Upload");
let DataItem = class DataItem {
};
exports.DataItem = DataItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DataItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DataItem.prototype, "recipientAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", { precision: 65, scale: 0 }),
    __metadata("design:type", String)
], DataItem.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], DataItem.prototype, "isDistributed", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Upload_1.Upload, (upload) => upload.dataItems),
    __metadata("design:type", Upload_1.Upload)
], DataItem.prototype, "upload", void 0);
exports.DataItem = DataItem = __decorate([
    (0, typeorm_1.Entity)()
], DataItem);
