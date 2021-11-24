import makeNumSentences from "./makeNumSentences";

describe('makeNumSentences', () => {
  it('is makeNumSentences', () => {
    expect(makeNumSentences()).toEqual([]);
  });
  it('should be able to return all possible strings', () => {
    const nums = '143163421154143';
    const predefinedNumbers = ['21154', '143', '21154143', '1634', '163421154'];
    expect(makeNumSentences(nums, predefinedNumbers).sort()).toEqual([
      ':143:1634:21154:143:',
      ':143:163421154:143:',
      ':143:1634:21154143:'
    ].sort());
  });
});
