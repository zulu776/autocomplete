import { TrieTreeNode } from "./TrieTreeNode";

export class TrieTree {
  constructor() {
    this.root = new TrieTreeNode(null);
  }

  findNode(prefix) {
    //*regresa [node, depth] node -> el último nodo para el string dado (prefijo)
    //* y depth -> numero de caracteres del prefijo que coinciden con los nodos de la estructura.
    if (prefix.length === 0) {
      return [this.root, 0];
    }

    let [node, depth] = [this.root, 0];

    for (let i = 0; i < prefix.length; i++) {
      if (node.hasChild(prefix[i])) {
        node = node.getChild(prefix[i]);
        depth += 1;
      } else {
        return [node, 0];
      }
    }
    return [node, depth];
  }

  traverse(node, prefix, visit) {
    //*Recorre el árbol de forma recursiva.
    if (node.isTerminal()) {
      visit(prefix);
    }

    for (const char of node.children.keys()) {
      const next_node = node.getChild(char);
      this.traverse(next_node, prefix + char, visit);
    }
  }

  isEmpty() {
    //*regresa true si el árbol está vacio o false y si no está vacio.
    return this.size === 0;
  }

  contains(str) {
    //*regresa true si el string se encuentra en el tree trie.
    let current = this.root;
    for (let character of str) {
      if (current.children[character] === undefined) {
        return false;
      }
      current = current.children[character];
    }
    return current.isEndOfWord;
  }

  insert(str) {
    //*agrega un string en el tree trie.
    let current = this.root;

    for (let character of str) {
      if (current.children[character] === undefined) {
        current.children[character] = new TrieTreeNode(character);
      }

      current = current.children[character];
    }

    current.isEndOfWord = true;
  }

  complete(prefix) {
    //* regresa un arreglo de strings con el prefijo dado.
    const completions = [];

    // Pull out the values returned from findNode
    const [node, depth] = this.findNode(prefix);

    // No node was found
    if (depth === 0) {
      return completions;
    }

    // A node was retrieved, traverse it.
    this.traverse(node, prefix, completions.push(completions));
    return completions;
  }

  allTreeStrings() {
    const all_strings = [];
    this.traverse(this.root, "", all_strings.push(all_strings));
    return all_strings;
  }
}
