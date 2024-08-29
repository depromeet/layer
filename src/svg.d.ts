declare module "*.svg" {
  const value: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default value;
}

declare module "@/assets/svgs/spriteSvgs/loginLogo.svg" {
  const content: string;
  export default content;
}
