"use strict";

// Converts the AST [node] to a string for debugging purposes.
function prettyPrint(node) {
  if (node === undefined) return "<error>";

  return node.accept({
    visitBlockStmt: function(node) {
      var result = "(block";
      for (var i = 0; i < node.statements.length; i++) {
        result += " " + prettyPrint(node.statements[i]);
      }

      return result + ")";
    },
    visitExpressionStmt: function(node) {
      return "(; " + prettyPrint(node.expression) + ")";
    },
    visitIfStmt: function(node) {
      var result = "(if " + prettyPrint(node.condition) + " then ";
      result += prettyPrint(node.thenBranch);
      if (node.elseBranch !== null) {
        result += " else " + prettyPrint(node.elseBranch);
      }
      return result + ")";
    },
    visitVarStmt: function(node) {
      return "(var " + node.name + " = " + prettyPrint(node.initializer) + ")";
    },
    visitWhileStmt: function(node) {
      var result = "(while " + prettyPrint(node.condition) + " ";
      return result + prettyPrint(node.body) + ")";
    },

    visitAssignExpr: function(node) {
      var result = "(= " + prettyPrint(node.target) + " ";
      return result + prettyPrint(node.value) + ")";
    },
    visitBinaryExpr: function(node) {
      var result = "(" + node.op + " " + prettyPrint(node.left) + " ";
      return result + prettyPrint(node.right) + ")";
    },
    visitCallExpr: function(node) {
      var result = "(call " + prettyPrint(node.fn);
      for (var i = 0; i < node.args.length; i++) {
        result += " " + prettyPrint(node.args[i]);
      }

      return result + ")";
    },
    visitLogicalExpr: function(node) {
      var result = "(" + node.op + " " + prettyPrint(node.left) + " ";
      return result + prettyPrint(node.right) + ")";
    },
    visitNumberExpr: function(node) {
      return node.value.toString();
    },
    visitPropertyExpr: function(node) {
      return "(." + node.name + " " + prettyPrint(node.object) + ")";
    },
    visitStringExpr: function(node) {
      // TODO: Escape special characters.
      return node.value.toString();
    },
    visitUnaryExpr: function(node) {
      var result = "(" + node.op + " ";
      result += prettyPrint(node.right) + ")";
      return result;
    },
    visitVariableExpr: function(node) {
      return node.name;
    }
  });
}

module.exports = prettyPrint;