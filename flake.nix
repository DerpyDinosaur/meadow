{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable"; # Or a specific commit for stability
  };

  outputs =
    { self, nixpkgs }:
    let
      system = "x86_64-linux"; # Adjust for your system (e.g., aarch64-darwin)
      pkgs = import nixpkgs { inherit system; };
    in
    {
      devShells.${system}.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_20 # Or your desired Node.js version
        ];

        # Optional: Define environment variables or hooks
        shellHook = ''
          echo "Entering Node.js development shell..."
        '';
      };
    };
}