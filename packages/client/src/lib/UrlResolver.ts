class UrlResolver {
  index() {
    return "/";
  }

  signS3() {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/s3/sign-and-save`;
  }
}

export default UrlResolver;
