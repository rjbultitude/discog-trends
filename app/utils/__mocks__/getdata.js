import mockData from './mock-data';

export default function getData() {
  return Promise.resolve({
    json: () => {
      Promise.resolve(mockData);
    },
  });
}
