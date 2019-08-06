import { TransformOptions } from '@babel/core'
export  type buildOptions = {
  entry: string;
  extensions: string[];
  relative: boolean;
  copyFiles: boolean;
  keepFileExtension: boolean;
  filenames: string; // 编译的文件
  outDir: string; // 产物目录
};
export  type babelOptions = TransformOptions;
export type rollupOptions = {
  
}
export type versionOptions = any;