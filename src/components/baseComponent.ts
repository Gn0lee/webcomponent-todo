export class BaseComponent extends HTMLElement {
  /**
   * Shadow DOM에서 특정 셀렉터로 요소를 가져오는 메서드.
   * @param selector - CSS 셀렉터 문자열
   * @returns T - 찾은 요소 또는 null
   */
  protected getShadowElement<T extends HTMLElement>(
    selector: string
  ): T | null {
    return this.shadowRoot?.querySelector(selector) || null;
  }

  /**
   * Shadow DOM에서 특정 셀렉터로 요소를 가져오며, 요소가 없으면 오류를 발생시킴.
   * @param selector - CSS 셀렉터 문자열
   * @returns T - 찾은 요소
   * @throws 에러 메시지 포함
   */
  protected getShadowElementOrThrow<T extends HTMLElement>(
    selector: string
  ): T {
    const element = this.getShadowElement<T>(selector);
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    return element;
  }
}
