function capitalizeText(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      node.textContent = node.textContent?.toUpperCase() ?? null;
    } else {
      node.childNodes.forEach(capitalizeText);
    }
  }
  
  capitalizeText(document.body);
  