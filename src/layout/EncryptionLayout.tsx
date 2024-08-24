// import { PropsWithChildren, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
//
// import { useRequiredParams } from "@/hooks/useRequiredParams.ts";
// import { decodingURL, encodingURL } from "@/utils/encryption/urlEncryption.ts";
//
// export function EncryptionLayout({ children, encryptedKeys = ["spaceId"] }: PropsWithChildren<{ encryptedKeys?: string[] }>) {
//   const params = useRequiredParams();
//   const navigate = useNavigate();
//
//   useEffect(() => {
//     const updatedParams = { ...params };
//
//     encryptedKeys?.forEach((key) => {
//       if (params[key]) {
//         try {
//           // 지정된 키에 해당하는 값을 복호화
//           updatedParams[key] = encodingURL(params[key]);
//         } catch (error) {
//           console.error(`Failed to decrypt the path for key ${key}:`, error);
//         }
//       }
//     });
//
//     const newPath = Object.keys(updatedParams)
//       .map((key) => `/${updatedParams[key]}`)
//       .join("");
//
//     console.log(newPath);
//
//     // console.log(decodingURL(newPath));
//     // navigate(newPath, { replace: true });
//
//     console.log(updatedParams);
//   }, []);
//
//   return children;
// }
