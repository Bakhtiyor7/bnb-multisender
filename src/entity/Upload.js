"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const typeorm_1 = require("typeorm");
const DataItem_1 = require("./DataItem");
let Upload = class Upload {
};
exports.Upload = Upload;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Upload.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Upload.prototype, "uploaderAddress", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Upload.prototype, "tokenAddress", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], Upload.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => DataItem_1.DataItem, (dataItem) => dataItem.upload, { cascade: true })
], Upload.prototype, "dataItems", void 0);
exports.Upload = Upload = __decorate([
    (0, typeorm_1.Entity)()
], Upload);
