import { createDecorator } from 'vue-class-component';

export default function MapVuex(
  mapItem: (namespace: string, states: string[] | object) => void,
  namespace: string,
  states: string[] | object
) {
  return createDecorator(options => {
    if (!options.computed) options.computed = {};
    Object.assign(options.computed, mapItem(namespace, states));
  });
}
