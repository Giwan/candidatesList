import { sortPositionLogic } from "../sortController";

describe("sort direction", () => {
    it('should sort by position', () => {
        expect(sortPositionLogic(true, "aaa", "bbb")).toBe(1);
        expect(sortPositionLogic(true, "bbb", "aaa")).toBe(-1);
        expect(sortPositionLogic(false, "aaa", "bbb")).toBe(-1);
        expect(sortPositionLogic(false, "bbb", "aaa")).toBe(1);
    })
})