import { TemplateKey, TemplateObj } from "@/component/retrospect/template/card/template.const";

export function createTemplateArr(specificId: TemplateKey) {
  const keys = Object.keys(TemplateObj) as unknown as Array<TemplateKey>;
  const shuffled = keys
    .filter((key) => {
      return key.toString() !== specificId.toString();
    })
    .sort(() => Math.random() - 0.5)
    .map((key) => TemplateObj[key]);
  const result = [...shuffled.slice(0, 4), TemplateObj[specificId], ...shuffled.slice(4)];
  return result;
}
