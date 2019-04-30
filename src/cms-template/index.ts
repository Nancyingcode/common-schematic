import { Rule, url, template, Tree, SchematicContext,
  apply, mergeWith, branchAndMerge, chain } from '@angular-devkit/schematics';

// const licenseText = `
// /**
//  * @license
//  * Copyright Google Inc. All Rights Reserved.
//  *
//  * Use of this source code is governed by an MIT-style license that can be
//  * found in the LICENSE file at https://angular.io/license
//  */
// `;

interface Options {
  '--': string[];
}


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function cmsTemplate(_options: Options): Rule {
  // return (tree: Tree, _context: SchematicContext) => {
  //   tree.create(_options.name || 'hello', 'world');
  //   return tree;
  // };
  console.log(_options)

  return (tree: Tree, context: SchematicContext) => {
    const urlSource = url('./_files');
    const [name] = _options['--'];

    const templatingHtmlOptions = { name, filename: `${name}.html`, city: 'Amsterdam', type: 'html' };
    const templateHtmlRule = template(templatingHtmlOptions);
    const templateHtmlSource = apply(urlSource, [templateHtmlRule]);

    const templatingLessOptions = { name, filename: `${name}.less`, city: 'Amsterdam', type: 'less' };
    const templateLessRule = template(templatingLessOptions);
    const templateLessSource = apply(urlSource, [templateLessRule]);

    const templatingTsOptions = { name, filename: `${name}.ts`, city: 'Amsterdam', type: 'ts' };
    const templateTsRule = template(templatingTsOptions);
    const templateTsSource = apply(urlSource, [templateTsRule]);

    // const mergedTreeHtml = mergeWith(templateHtmlSource);
    // const mergedTreeLess = mergeWith(templateLessSource);
    // const mergedTreeTs = mergeWith(templateLessSource);
    const rule = chain([
      branchAndMerge(chain([
        mergeWith(templateHtmlSource),
        mergeWith(templateLessSource),
        mergeWith(templateTsSource)
      ]))
    ])

    return rule(tree, context);
  }
}
