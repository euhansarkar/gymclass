"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchingFilteringHelper = void 0;
const searchingFiltering = ({ filters, searchAbleFields, relationalFields, relationalFieldsMapper, }) => {
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    // Process `filterData` to handle data type conversions
    const filterDataTypes = Object.entries(filterData).reduce((acc, [key, value]) => {
        if (typeof value === 'string' && !isNaN(Number(value))) {
            acc[key] = Number(value); // Convert to number if not NaN
        }
        else {
            acc[key] = value; // Keep as is otherwise
        }
        return acc;
    }, {});
    console.log(`Processed filter data:`, filterDataTypes);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: searchAbleFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterDataTypes).length > 0) {
        andConditions.push({
            AND: Object.keys(filterDataTypes).map(key => {
                if (relationalFields.includes(key)) {
                    return {
                        [relationalFieldsMapper[key]]: {
                            id: filterDataTypes[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterDataTypes[key],
                        },
                    };
                }
            }),
        });
    }
    return andConditions;
};
exports.SearchingFilteringHelper = {
    searchingFiltering,
};
