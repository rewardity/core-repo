import { NFTStorage, File } from "nft.storage"

export const uploadIpfs = async (key: string, object: unknown) => {
  const type = "application/json"
  const fileEntity = new File([JSON.stringify(object)], "/", { type })
  const nftStorage = new NFTStorage({ token: key })

  return nftStorage.storeBlob(fileEntity)
}
