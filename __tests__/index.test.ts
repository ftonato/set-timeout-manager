import SetTimeout from '../src/index';

describe('SetTimeout', () => {
  let callback: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();

    callback = jest.fn(() => Math.floor(Math.random() * 100));
  });

  afterEach(() => {
    SetTimeout.clearAll();
  });

  describe('start()', () => {
    it('should start a new timeout with the specified function and delay', () => {
      SetTimeout.start(callback, 100, 'test-timeout');
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(99);
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should not start a new timeout if a timeout with the same key already exists', () => {
      SetTimeout.start(callback, 100, 'test-timeout');
      SetTimeout.start(callback, 200, 'test-timeout');
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(99);
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
      jest.advanceTimersByTime(100);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('clear()', () => {
    it('should clear the timeout with the specified key', () => {
      SetTimeout.start(callback, 100, 'test-timeout');
      SetTimeout.clear('test-timeout');
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(100);
      expect(callback).not.toBeCalled();
    });

    it('should do nothing if no timeout with the specified key exists', () => {
      SetTimeout.clear('test-timeout');
      expect(callback).not.toBeCalled();
    });
  });

  describe('clearAll()', () => {
    it('should clear all timeouts managed by the utility', () => {
      SetTimeout.start(callback, 100, 'test-timeout-1');
      SetTimeout.start(callback, 200, 'test-timeout-2');
      SetTimeout.start(callback, 300, 'test-timeout-3');
      SetTimeout.clearAll();
      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(300);
      expect(callback).not.toBeCalled();
    });
  });

  describe('listAll()', () => {
    it('should return an array of all keys currently being used to manage timeouts', () => {
      SetTimeout.start(callback, 100, 'test-timeout-1');
      SetTimeout.start(callback, 200, 'test-timeout-2');
      SetTimeout.start(callback, 300, 'test-timeout-3');
      expect(SetTimeout.listAll()).toEqual(['test-timeout-1', 'test-timeout-2', 'test-timeout-3']);
    });

    it('should return an empty array if no timeouts are being managed', () => {
      expect(SetTimeout.listAll()).toEqual([]);
    });
  });
});
