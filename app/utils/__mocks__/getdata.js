import mockData from './mock-data.json';

export default function getData() {
  return Promise.resolve({
    json: () => {
      Promise.resolve(JSON.parse(mockData));
    },
  });
}
