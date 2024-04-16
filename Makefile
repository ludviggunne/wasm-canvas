
CC=clang
CFLAGS=-Wall -Wextra -Wpedantic -Werror -std=c11 --target=wasm32
LD=wasm-ld
LDFLAGS=--no-entry --export-all
PYTHON=python3

SRC=$(wildcard *.c)
OBJ=$(SRC:%.c=build/%.o)

image.wasm: $(OBJ)
	$(LD) $(LDFLAGS) -o $@ $(OBJ)

build/%.o: %.c
	@mkdir -p build/
	$(CC) $(CFLAGS) -c $< -o $@

serve: image.wasm
	$(PYTHON) -m http.server

clean:
	rm -fr build/ image.wasm
