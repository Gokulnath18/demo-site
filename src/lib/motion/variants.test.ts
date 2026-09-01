import {
  getRevealVariants,
  getStaggerContainerVariants,
  STAGGER_DELAY_S,
} from "./variants";

describe("getRevealVariants", () => {
  it("includes a translate offset by default", () => {
    const variants = getRevealVariants(false);
    expect(variants.hidden).toMatchObject({
      opacity: 0,
      y: expect.any(Number),
    });
    expect((variants.hidden as { y: number }).y).toBeGreaterThan(0);
  });

  it("drops the translate offset and stays opacity-only when reduced", () => {
    const variants = getRevealVariants(true);
    expect(variants.hidden).toEqual({ opacity: 0 });
    expect(variants.hidden).not.toHaveProperty("y");
  });
});

describe("getStaggerContainerVariants", () => {
  it("staggers children by the shared delay by default", () => {
    const variants = getStaggerContainerVariants(false);
    const visible = variants.visible as {
      transition: { staggerChildren: number };
    };
    expect(visible.transition.staggerChildren).toBe(STAGGER_DELAY_S);
  });

  it("collapses the stagger to 0 when reduced motion is preferred", () => {
    const variants = getStaggerContainerVariants(true);
    const visible = variants.visible as {
      transition: { staggerChildren: number };
    };
    expect(visible.transition.staggerChildren).toBe(0);
  });
});
