export default function (plop) {
  plop.setGenerator('component', {
    description: 'Generate a React component folder structure',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name (PascalCase please)',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
        templateFile: '.templates/Component.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/index.ts',
        templateFile: '.templates/index.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: '.templates/Component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.types.ts',
        templateFile: '.templates/Component.types.ts.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: '.templates/Component.stories.tsx.hbs',
      },
    ],
  })
}
