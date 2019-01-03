function action(type, payload = {}){
  return {type, ...payload}
}

export const exampleAction = (stuff) => action('EXAMPLE_ACTION', {stuff})