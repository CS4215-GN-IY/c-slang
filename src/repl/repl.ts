import {start} from "repl";
import {parse} from "../parser/parser";
import * as es from 'estree'

function startRepl() {
  start(
    {
      eval: (cmd, unusedContext, unusedFileName, callback) => {
        const tree: es.Program = parse(cmd)
        callback(null, JSON.stringify(tree.body))
      }
    }
  )
}

function main() {
  startRepl()
}

main()
