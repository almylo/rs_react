import React, { lazy, Suspense } from 'react'

const config = [
  {
    name: 'First',
    path: './components/First',
    props: {name: 'Alex', surname: 'Mylo'}
  },
  {
    name: 'Second',
    path: './components/Second',
    props: {name: 'John', surname: 'Doe'}
  }
]

const importedComponents = () => {
  const components = {}
  for(let i = 0; i < config.length; i++) {
    components[config[i].name] = lazy(() => import(`${config[i].path}`))
  }
  return components
}

const App = () => {
  const Components = importedComponents()

  const components = config.map(c => {
    const Component = Components[c.name]
    return <Suspense key={c.name} fallback={<div>loading...</div>}><Component key={c.name} {...c.props} /></Suspense>
  })
  return <div>{components}</div>
}

export default App