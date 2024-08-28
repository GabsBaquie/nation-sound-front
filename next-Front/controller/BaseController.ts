export class BaseController<T> {
  protected model: T | null = null;
  protected error: string | null = null;

  constructor(props: T) {
    try {
      this.model = this.initializeModel(props);
    } catch (err) {
      this.handleError(err);
    }
  }

  protected initializeModel(props: T): T {
    return props;
  }

  protected static constructImageURL(image?: {
    url: string;
    alternativeText: string;
  }) {
    if (!image) return undefined;
    const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

    // Vérifier si l'URL commence déjà par "http" pour éviter de la doubler
    if (image.url.startsWith("http")) {
      return {
        url: image.url,
        alternativeText: image.alternativeText,
      };
    }

    // Sinon, ajouter le préfixe baseURL
    return {
      url: `${baseURL}${image.url}`,
      alternativeText: image.alternativeText,
    };
  }

  protected handleError(err: unknown) {
    this.error = `Failed to initialize model: ${
      err instanceof Error ? err.message : String(err)
    }`;
    console.error(this.error);
  }

  getModel(): T | null {
    if (this.error) {
      throw new Error(this.error);
    }
    return this.model;
  }
}